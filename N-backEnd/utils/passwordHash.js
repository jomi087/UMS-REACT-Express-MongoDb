import bcrypt from 'bcrypt'

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash

    } catch (error) {
        throw error;
    }
}

export default securePassword