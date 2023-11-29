document.addEventListener('DOMContentLoaded', function() {
    const partyList = document.getElementById('partyList');
    const partyForm = document.getElementById('partyForm'); 

    fetchParties();

    partyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addNewParty();
    });

    async function fetchParties() {
        try {
            const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/recipes'); 
            if (!response.ok) {
                throw new Error('Error fetching parties!');
            }
            const parties = await response.json();
            displayParties(parties);
        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    function displayParties(parties) {
        
        partyList.innerHTML = ''; 
    
        
        for (let i = 0; i < parties.length; i++) {
            
            const party = parties[i];
            const partyElement = document.createElement('li');
            partyElement.textContent = 'Party Name: ' + party.name + ', Date: ' + party.date;
            partyList.appendChild(partyElement);
        }
    }
    

    async function addNewParty() {
        
        const partyName = document.getElementById('partyName').value; 
        const partyDate = document.getElementById('partyDate').value; 

        try {
            const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: partyName, date: partyDate }) 
            });

            if (!response.ok) {
                throw new Error('Error creating party!');
            }

            
            fetchParties();
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
});
