document.getElementById('saveButton').onclick = function() {
    const hwid = document.getElementById('hwidInput').value;
    const statusElement = document.getElementById('status');

    if (hwid) {
        // User's Pastebin API key
        const apiKey = "EN34Lk0wPg1IpHe4XJg0ODNBwLH8tANz"; // Replace with your actual key
        const pasteKey = "YOUR_PASTE_KEY"; // Replace with the key of the paste you want to edit
        const pasteUrl = "https://pastebin.com/api/api_post.php";
        
        // Fetch the existing paste content
        fetch(`https://pastebin.com/raw/${pasteKey}`)
        .then(response => response.text())
        .then(existingContent => {
            // Append the new HWID to the existing content
            const updatedContent = existingContent.replace('}', `"${hwid}",\n}`);

            // Prepare the data to update the paste
            const data = {
                api_dev_key: apiKey,
                api_option: 'edit',
                api_paste_key: pasteKey,
                api_paste_code: updatedContent,
                api_user_key: "", // If you have a user key, add here
            };

            // Send the updated data to Pastebin
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
        })
        .catch(error => {
            statusElement.innerText = "Error fetching existing paste content.";
            console.error('Error:', error);
        });
    } else {
        statusElement.innerText = "Please enter an HWID.";
    }
};
