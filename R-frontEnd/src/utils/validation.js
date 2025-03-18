export const namePhoneImageValidation = (name, phone, image) => { 
    name = name.trim();
    phone = phone.trim();
    
    // Name validation
    if (!name) return "Name required";
    if (name.length < 4) return "Name must be 4+ chars";

    // Phone validation
    if (!phone) return "Phone required";
    if (!/^\d+$/.test(phone)) return "Only digits allowed";
    if (phone.length !== 10) return "Phone must be 10 digits";

    // Image validation
    if (!image) return "Image required";

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(image.type)) return "Only JPG, PNG";
    const maxSize = 5 * 1024 * 1024; 
    if (image.size > maxSize) return "Max 5MB size";

    return null;
};

export const emailPasswordValidation = (email, password) => {
    
    email = email.trim();
    password = password.trim();

    // Email validation
    if (!email) return "Email field cannot be empty";
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!isEmailValid) return "Email is not valid";

    //Password validation
    if (!password) return "Password field cannot be empty";
    const isPasswordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);   
    if (!isPasswordValid) return "Password is not valid";
    
    return null
}

