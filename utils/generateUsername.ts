export const generateFromEmail = (email: string) => {
    // Retrieve name from email address
    const nameParts = email.replace(/@.+/, "")
    // Replace all special characters like "@ . _ ";
    const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "")
    return name + Math.floor(Math.random()*(999-100+1)+100)
}