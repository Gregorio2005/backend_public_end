const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Asegurar que la carpeta uploads/cvs exista
const uploadsDir = path.join(__dirname, '../../uploads/cvs');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ci = req.body.ci || 'unknown';
        const cleanCi = ci.replace(/[^a-zA-Z0-9]/g, '');
        const ext = path.extname(file.originalname);
        cb(null, `${timestamp}_${cleanCi}${ext}`);
    }
});

// Filtro de archivos: solo PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos en formato PDF.'), false);
    }
};

// Configuración de multer
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB máximo
    }
});

module.exports = upload;
