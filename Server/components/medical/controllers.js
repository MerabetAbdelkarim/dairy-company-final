const fs = require('fs')
const path = require('path');

const asyncHandler = require('express-async-handler');
const ApiError = require('../../utils/apiError');

const ID = require("nodejs-unique-numeric-id-generator")

const databasefilepath = path.join(__dirname, '..', '..', 'database', 'database.json');
let databaseContent = JSON.parse(fs.readFileSync(databasefilepath));
let { Medical } = databaseContent;
let { Cows } = databaseContent;

if (!Medical) {
    Medical = [];
}
const MedicalPerPage = 8;


// Get all Medical
exports.getallMedical = asyncHandler(async (req, res) => {
    res.status(200).json({
        results: Medical.length,
        data: Medical
    });
});

//get Medical 
exports.getMedical = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || MedicalPerPage;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const slicedMedical = Medical.slice(startIndex, endIndex);
    res.status(200).json({
        results: slicedMedical.length,
        currentPage: page,
        totalPages: Math.ceil(Medical.length / limit),
        data: slicedMedical
    });
});
//add medical examination
exports.addMedical = asyncHandler(async (req, res, next) => {
    const { cowid, dateofmedical, disease } = req.body;
    console.log('---------',req.body)
    const allowedDiseases = [
        "Bluetongue",
        "Botulism",
        "Bovine-Tuberculosis",
        "Brucellosis"
    ];
    const cowIds = Cows.map(cow => cow.id);
    if (!dateofmedical) {
        return next(new ApiError('Date of examination is required.', 400));
    }

    if (!allowedDiseases.includes(disease)) {
        return next(new ApiError('Invalid disease. Please provide a valid disease.', 400));
    }
    if (!cowIds.includes(cowid)) {
        return next(new ApiError('Invalid cow ID. Please provide a valid cow ID.', 400));
    }
    const numericId = ID.generate(new Date().toJSON());
    const newMedical = {
        id: numericId,
        cowid,
        dateofmedical,
        disease
    };
    await Medical.push(newMedical);
    databaseContent.Medical = Medical;
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.status(201).json({ message: 'Medical  added successfully', data: newMedical });
});

//update Medical 
exports.updateMedical = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { dateofmedical, disease, cowid } = req.body;
    const MedicalIndex = Medical.findIndex(Medical => Medical.id === id);

    if (MedicalIndex === -1) {
        return next(new ApiError('Medical  not found', 404));
    }
    const allowedDiseases = [
        "Bluetongue",
        "Botulism",
        "Bovine-Tuberculosis",
        "Brucellosis"
    ];
    if (disease && !allowedDiseases.includes(disease)) {
        return next(new ApiError('Invalid disease. Please provide a valid disease.', 400));
    }

    const cowIds = Cows.map(cow => cow.id);
    if (cowid && !cowIds.includes(cowid)) {
        return next(new ApiError('Invalid cow ID. Please provide a valid cow ID.', 400));
    }
    Medical[MedicalIndex].dateofmedical = dateofmedical || Medical[MedicalIndex].disease;
    Medical[MedicalIndex].disease = disease || Medical[MedicalIndex].disease;
    Medical[MedicalIndex].cowid = cowid || Medical[MedicalIndex].cowid;

    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Medical examination updated successfully', data: Medical[MedicalIndex] });
});

//delete Cow
exports.deleteMedical = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const MedicalIndex = Medical.findIndex(Medical => Medical.id === id);

    if (MedicalIndex === -1) {
        return next(new ApiError('Medical  not found', 404));
    }
    await Medical.splice(MedicalIndex, 1);
    fs.writeFileSync(databasefilepath, JSON.stringify(databaseContent));
    res.json({ message: 'Medical  deleted successfully' });
});