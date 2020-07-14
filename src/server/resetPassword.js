async function resetPassword(email) {
    const resetURL = new URL('https://api.efactura.md:4445/WebPortalEDXService/json/ResetPassword?');
    const params = { Login: email };
    resetURL.search = new URLSearchParams(params).toString();
    try {
        const response = await fetch(resetURL);
        const data = await response.json();
        console.log('Received invoice: ', data);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export { resetPassword };