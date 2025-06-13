// Function to generate unique ID for each salon
function generateID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to save salon data
function saveSalonData(event) {
    event.preventDefault();

    // Get all the form values
    const salonData = {
        id: generateID(),
        salonName: document.getElementById('salonName').value,
        salonType: document.getElementById('salonType').value,
        phoneNo: document.getElementById('phoneNo').value,
        address: document.getElementById('address').value,
        services: document.getElementById('services').value,
        days: Array.from(document.querySelectorAll('input[name="days[]"]:checked')).map(cb => cb.value),
        openTime: document.querySelector('input[name="openTime"]').value,
        closeTime: document.querySelector('input[name="closeTime"]').value,
        ownerName: document.getElementById('ownerName').value,
        ownerPhone: document.getElementById('ownerPhone').value,
        ownerEmail: document.getElementById('ownerEmail').value,
        accountHolderName: document.getElementById('accountHolderName').value,
        bankName: document.getElementById('bankName').value,
        accountNumber: document.getElementById('accountNumber').value,
        ifscCode: document.getElementById('ifscCode').value,
        upiId: document.getElementById('upiId').value,
        status: 'Active',
        dateRegistered: new Date().toISOString()
    };

    // Get existing salons from localStorage
    let salons = JSON.parse(localStorage.getItem('salons')) || [];
    
    // Add new salon
    salons.push(salonData);
    
    // Save back to localStorage
    localStorage.setItem('salons', JSON.stringify(salons));

    // Show success message
    alert('Salon registered successfully!');
    
    // Redirect to listings page
    window.location.href = 'listings.html';
}

// Add event listener to form
document.querySelector('form').addEventListener('submit', saveSalonData);

// Form Navigation Logic
let currentStep = 1;
const totalSteps = 4;

function showStep(step) {
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`step${step}`).classList.add('active');

    document.querySelectorAll('.step').forEach((stepElement, index) => {
        if (index + 1 === step) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });

    document.getElementById('prevBtn').disabled = step === 1;
    document.getElementById('nextBtn').style.display = step === totalSteps ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = step === totalSteps ? 'block' : 'none';
}

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
});

// File Upload Previews
function handleFileUpload(event, previewId) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById(previewId);
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById('salonImage1').addEventListener('change', (event) => handleFileUpload(event, 'preview1'));
document.getElementById('salonImage2').addEventListener('change', (event) => handleFileUpload(event, 'preview2'));
document.getElementById('salonImage3').addEventListener('change', (event) => handleFileUpload(event, 'preview3'));

// Toggle Payment Details
document.getElementById('togglePayment').addEventListener('click', () => {
    const paymentDetails = document.getElementById('paymentDetails');
    paymentDetails.classList.toggle('active');
    const icon = document.querySelector('#togglePayment i');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
});

// Initialize the first step
showStep(currentStep);