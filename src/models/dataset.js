const mongoose = require('mongoose')

const datasetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    domain: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    Type: [{
        type: String
    }],
    ArtifactSize: {
        type: Number,
        default: 1000
    },
    ProgramingLanguage: [{
        type: String
    }],
    ArtifactsFormat: [{
        type: String
    }],
    ArtifactsType: [{
        type: String
    }],
    OracleDeveloper: [{
        type: String
    }],
    OracleCollections: [{
        type: String
    }],
    OracleIsPresent: [{
        type: String
    }],
    OracleSize: {
        type: Number,
        default: 1,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    OracleCollections: [{
        type: String
    }],
    OracleIsPresent: [{
        type: String
    }],
    Storage: {
        type: String,
        trim: true
    },
    Licensing: {
        type: String,
        trim: true
    },
    MultiVersion: {
        type: String,
        trim: true
    },
    IndustryRepresntative: {
        type: String,
        trim: true
    },
    MultiVersion: {
        type: String,
        trim: true
    },
    file: {
        filetype: {
            type: String
        },
        filename: {
            type:String
        },
        data: {
            type:Buffer
        }
    }
})

const Dataset = mongoose.model('Dataset', datasetSchema)

module.exports = Dataset