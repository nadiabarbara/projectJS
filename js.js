'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const ContactsList = [
        { name: "Nadia Burbara", phone: "0542125330", email: "nadiabarbara10@gmail.com" },
        { name: "Waseem Shehade", phone: "0544483724", email: "wassem.31@hotmail.com" },
        { name: "John Doe", phone: "0542598634", email: "john.10@Doe.com" },
        { name: "Jane Smith", phone: "0547399221", email: "jane@gmail.com" },
    ];

    let contacts = [...ContactsList];
    let editIndex = null;

    const renderContacts = () => {
        const contactList = document.getElementById("contactList");
        contactList.innerHTML = "";

        contacts.forEach((contact, index) => {
            const li = document.createElement("li");
            li.classList.add("contact-item");
            li.innerHTML = `
                <div class="contact-name">${contact.name}</div>
                <div class="contact-email">Email: ${contact.email}</div>
                <div class="contact-phone">Phone: ${contact.phone}</div>
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
            `;
            contactList.appendChild(li);
        });
    };

    window.editContact = (index) => {
        editIndex = index;
        const contact = contacts[index];
        document.getElementById("name").value = contact.name;
        document.getElementById("email").value = contact.email;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("popupTitle").textContent = "Edit Contact";
        document.getElementById("popup").style.display = "block";
    };

    window.deleteContact = (index) => {
        if (confirm("Are you sure you want to delete this contact?")) {
            contacts.splice(index, 1);
            renderContacts();
        }
    };

    window.deleteAllBtn = () => {
        if (confirm("Are you sure you want to delete all contacts?")) {
            contacts = [];
            renderContacts();
        }
    };

    document.getElementById("addPopupBtn").addEventListener("click", () => {
        editIndex = null;
        document.getElementById("contactForm").reset();
        document.getElementById("popupTitle").textContent = "Add Contact";
        document.getElementById("popup").style.display = "block";
    });

    document.getElementById("closePopupBtn").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
    });

    document.getElementById("contactForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (editIndex === null) {
            contacts.push({ name, email, phone });
        } else {
            contacts[editIndex] = { name, email, phone };
        }

        renderContacts();
        document.getElementById("contactForm").reset();
        document.getElementById("popup").style.display = "none";
    });

    renderContacts();
});
