    import mongoose, { Types } from "mongoose";

    const productSchema = new mongoose.Schema({
        name_fr: {
            type: String,
            required: true
        },
        name_en: {
            type: String,
            required: true
        },
        name_fl: {
            type: String,
            required: true
        },
        description_fr: {
            type: String,
            required: true
        },
        description_en: {
            type: String,
            required: true
        },
        description_fl: {
            type: String,
            required: true
        },
        langue: {
            type: String,
            enum: ['fr', 'en', 'fl'], 
            default: 'fl' 
        },
        
        image: {
            type: String,
            required: true 
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        user_id: {
            type: Types.ObjectId,
            ref: "User"
        },
        deletedAt: {
            type: Date,
            default: null  
        }
    
    });

        productSchema.pre('save', function (next) {
            if (this.isNew && typeof this.user_id === 'undefined') {
            
                this.user_id = mongoose.Types.ObjectId();
            }
            next();
        });
    export const Product = mongoose.model('Product', productSchema);
