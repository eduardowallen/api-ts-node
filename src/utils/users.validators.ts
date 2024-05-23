import {
    Request,
    Response,
    NextFunction
} from 'express'

export const validateUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get data from request body
    const {
        id,
        name,
        email,
        password
    } = req.body

    // Create an array to story errors
    const errors = []

    // Validate data
    if (!id) {
        errors.push('User ID is required')
    }

    if (!name) {
        errors.push('Name is required')
    }

    if (!email) {
        errors.push('Email is required')
    }
    
    if (!password) {
        errors.push('Password is required')
    } else {
        // Add more validations here, eg password should be at least x characters long and contain characters of a-z, A-Z, 0-9
        if (password.length < 8) {
            errors.push('Password should be at least 8 characters long')
        }
    }

    if (errors.length) {
        return res.status(422).json({
            message: 'Validation failed',
            errors
        })
    }
    // Pass user data to the next middleware
    next()
}