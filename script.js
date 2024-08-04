window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hwid = urlParams.get('HWID');
    const statusElement = document.getElementById('status');

    if (hwid) {
        // User's Pastebin API key (already known)
        const apiKey = "EN34Lk0wPg1IpHe4XJg0ODNBwLH8tANz"; // replace with user's actual key
        const pasteUrl = "https://pastebin.com/api/api_post.php";

        // Pastebin API settings
        const data = {
            api_dev_key: apiKey,
            api_option: 'edit',
            api_paste_code: `return{\n"${hwid}",\n}`,
            api_user_key: "", // If you have user key, add here
            api_paste_private: 0, // 0 = public, 1 = unlisted, 2 = private
            api_paste_name: "HWID Log",
            api_paste_expire_date: 'N', // Never expire
            api_paste_format: 'lua'
        };

        // Send data to Pastebin
        fetch(pasteUrl, {
            method: 'POST',
            body: new URLSearchParams(data)
        })
        .then(response => response.text())
        .then(result => {
            statusElement.innerText = "HWID logged successfully!";
            console.log(result);
        })
        .catch(error => {
            statusElement.innerText = "Error logging HWID.";
            console.error('Error:', error);
        });
    } else {
        statusElement.innerText = "No HWID provided in the URL.";
    }
};
