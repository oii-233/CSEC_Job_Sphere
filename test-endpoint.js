setTimeout(async () => {
    try {
        const res = await fetch('http://localhost:5000/api/auth/signup', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ name: 'Test', email: 'test.test12@example.com', password: '123' }) 
        });
        const data = await res.json();
        console.log("ENDPOINT RESPONSE: ", JSON.stringify(data, null, 2));
        process.exit(0);
    } catch (e) {
        console.error("ENDPOINT ERROR: ", e);
        process.exit(1);
    }
}, 4000);
