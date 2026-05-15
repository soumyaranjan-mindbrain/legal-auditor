const mongoose = require("mongoose");
const User = require("../../models/User");
const Document = require("../../models/Document");
const Audit = require("../../models/Audit");

// ==========================================
// GET ALL CLIENTS (Users with role 'user')
// ==========================================
exports.getAllClients = async (req, res) => {
    try {
        const clientsRaw = await User.find({ 
            role: 'user',
            _id: { $ne: req.user.id } 
        }).select('-password').sort({ createdAt: -1 }).lean();

        const clients = await Promise.all(clientsRaw.map(async (client) => {
            const [fileCount, reportCount] = await Promise.all([
                Document.countDocuments({ userId: client._id }),
                Audit.countDocuments({ userId: client._id })
            ]);
            return { 
                ...client, 
                fileCount: fileCount || 0, 
                reportCount: reportCount || 0 
            };
        }));
        
        res.status(200).json({
            success: true,
            data: clients
        });
    } catch (err) {
        console.error("Get all clients error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve clients"
        });
    }
};

// ==========================================
// GET ALL DOCUMENTS (Platform-wide)
// ==========================================
exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({
            success: true,
            data: documents
        });
    } catch (err) {
        console.error("Get all documents error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve document ingress"
        });
    }
};

// ==========================================
// GET ADMIN STATS
// ==========================================
exports.getAdminStats = async (req, res) => {
    try {
        const [clientCount, documentCount, reportCount] = await Promise.all([
            User.countDocuments({ role: 'user' }),
            Document.countDocuments(),
            Audit.countDocuments()
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalClients: clientCount,
                totalUploads: documentCount,
                totalReports: reportCount
            }
        });
    } catch (err) {
        console.error("Get admin stats error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve statistics"
        });
    }
};

// ==========================================
// GET PLATFORM ACTIVITY (7 Days)
// ==========================================
exports.getPlatformActivity = async (req, res) => {
    try {
        // Expecting 1-indexed month (1-12) from frontend, convert to 0-indexed for JS Date
        const queryMonth = req.query.month ? parseInt(req.query.month) : null;
        const month = queryMonth !== null ? queryMonth - 1 : new Date().getMonth();
        const year = parseInt(req.query.year) || new Date().getFullYear();
        
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0, 23, 59, 59);

        // Aggregate Uploads
        const uploads = await Document.aggregate([
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Aggregate Reports
        const reports = await Audit.aggregate([
            { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Merge results for frontend chart
        const activityMap = {};
        const daysInMonth = endDate.getDate();
        
        // Initialize all days of the selected month
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            activityMap[dateStr] = { date: dateStr, uploads: 0, reports: 0 };
        }

        uploads.forEach(u => { if (activityMap[u._id]) activityMap[u._id].uploads = u.count; });
        reports.forEach(r => { if (activityMap[r._id]) activityMap[r._id].reports = r.count; });

        res.status(200).json({
            success: true,
            data: Object.values(activityMap)
        });

    } catch (err) {
        console.error("Platform activity error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch activity metrics"
        });
    }
};

// ==========================================
// DELETE CLIENT (User) + CASCADE DELETE
// ==========================================
exports.deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Find and Delete User
        const client = await User.findByIdAndDelete(id);

        if (!client) {
            return res.status(404).json({
                success: false,
                error: "Client entity not found"
            });
        }

        // 2. Cascade Delete Associated Data
        // Deleting all documents and audits belonging to this tenant
        await Promise.all([
            Document.deleteMany({ userId: id }),
            Audit.deleteMany({ userId: id })
        ]);

        res.status(200).json({
            success: true,
            message: "Client and all associated archives purged from platform"
        });
    } catch (err) {
        console.error("Cascade delete client error:", err);
        res.status(500).json({
            success: false,
            error: "Failed to execute comprehensive client purge"
        });
    }
};
