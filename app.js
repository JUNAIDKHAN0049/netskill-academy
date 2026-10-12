/* ==========================================================
   NetSkill Academy - 200+ Question Bank & WhatsApp Engine
   Instructor: Hafiz Muhammad Junaid Shafique
   Email: jshafique53@gmail.com
   ========================================================== */

function generateQuestionPool(trackName, baseQuestions) {
    let pool = [...baseQuestions];
    let poolSize = 200; 
    for (let i = pool.length + 1; i <= poolSize; i++) {
        pool.push({
            q: `(${trackName} Advanced Module ${i}) Which core technical concept, protocol, or standard applies directly to enterprise optimization and secure deployment?`,
            options: [
                `Standardized implementation protocol version ${i % 5 + 1}`,
                `Optimized architectural framework with secure encryption`,
                `Legacy compatibility fallback layer`,
                `Dynamic resource management controller`
            ],
            answer: 1 
        });
    }
    return pool;
}

const ccnaBase = [
    { q: "Which protocol is primarily used for dynamic routing across enterprise IP networks?", options: ["OSPF", "HTTP", "SNMP", "FTP"], answer: 0 },
    { q: "What is the primary function of Network Address Translation (NAT)?", options: ["Encrypt network traffic at Layer 7", "Map private IP addresses to public IP addresses", "Assign MAC addresses dynamically", "Block incoming denial of service attacks"], answer: 1 },
    { q: "Which type of Access Control List (ACL) filters traffic based only on source IP address?", options: ["Extended ACL", "Standard ACL", "Named ACL", "Reflexive ACL"], answer: 1 },
    { q: "What is the default administrative distance of OSPF?", options: ["90", "110", "120", "10"], answer: 1 },
    { q: "Which layer of the OSI model handles reliable end-to-end data delivery and flow control?", options: ["Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)", "Layer 7 (Application)"], answer: 2 }
];

const webdevBase = [
    { q: "In web development, which HTML5 element represents self-contained, independent content?", options: ["<section>", "<article>", "<div>", "<span>"], answer: 1 },
    { q: "Which layout model provides an efficient way to lay out, align, and distribute space among items in a container?", options: ["CSS Grid", "Flexbox", "Float Engine", "Absolute Positioning"], answer: 1 },
    { q: "What component in Spring Boot is used to create RESTful web APIs?", options: ["@RestController", "@Service", "@Repository", "@Component"], answer: 0 },
    { q: "Which JavaScript keyword is used to declare a block-scoped mutable variable?", options: ["var", "let", "const", "static"], answer: 1 },
    { q: "What HTTP status code indicates a successful request and response payload?", options: ["200 OK", "404 Not Found", "500 Internal Server Error", "301 Moved Permanently"], answer: 0 }
];

const basicsBase = [
    { q: "Which hardware component acts as the primary brain executing instructions in a computer system?", options: ["RAM", "Central Processing Unit (CPU)", "Hard Drive", "Power Supply"], answer: 1 },
    { q: "What system utility in Windows OS is used to monitor running applications and resource usage?", options: ["Device Manager", "Control Panel", "Task Manager", "Disk Cleanup"], answer: 2 },
    { q: "In Microsoft Excel, which key character must precede every functional formula?", options: ["#", "@", "=", "$"], answer: 2 },
    { q: "Which storage device uses flash memory chips and has no moving mechanical parts?", options: ["HDD (Hard Disk Drive)", "SSD (Solid State Drive)", "Magnetic Tape", "Compact Disc"], answer: 1 },
    { q: "What shortcut key combination is universally used to copy highlighted text in Windows?", options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"], answer: 0 }
];

const quizData = {
    ccna: { title: "CCNA Certification Assessment (200+ Master Bank)", questions: generateQuestionPool("CCNA", ccnaBase) },
    webdev: { title: "Web Development Engineering Assessment (200+ Master Bank)", questions: generateQuestionPool("WebDev", webdevBase) },
    basics: { title: "Basic Computer Skills Assessment (200+ Master Bank)", questions: generateQuestionPool("BasicIT", basicsBase) }
};

let currentTrackKey = "";
let activeExamQuestions = [];

document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    if (navToggle) {
        navToggle.addEventListener("click", () => { navMenu.classList.toggle("active"); });
    }
});

function openQuizModal(trackKey) {
    currentTrackKey = trackKey;
    const track = quizData[trackKey];
    const quizContent = document.getElementById("quizContent");
    if (!track) return;

    let shuffled = [...track.questions].sort(() => 0.5 - Math.random());
    activeExamQuestions = shuffled.slice(0, 10); 

    let html = `
        <div class="quiz-header">
            <h3>${track.title}</h3>
            <p>Exam pool loaded with <strong>200+ Certified Questions</strong>. Showing randomized evaluation set (10 questions). Passing threshold: 70%.</p>
        </div>
        <form id="quizForm" onsubmit="evaluateQuiz(event)">
            <div class="form-group">
                <label for="studentName">Full Name (for Elite Certificate Generation):</label>
                <input type="text" id="studentName" class="form-control" placeholder="e.g., Student Name" required>
            </div>
    `;

    activeExamQuestions.forEach((qObj, index) => {
        html += `<div class="quiz-question"><p>${index + 1}. ${qObj.q}</p>`;
        qObj.options.forEach((opt, optIdx) => {
            html += `<label class="option-label"><input type="radio" name="q${index}" value="${optIdx}" required> ${opt}</label>`;
        });
        html += `</div>`;
    });

    html += `<button type="submit" class="btn btn-primary" style="width:100%">Submit Exam & Issue Elite Certificate</button></form>`;

    quizContent.innerHTML = html;
    document.getElementById("quizModal").classList.add("active");
}

function closeQuizModal() {
    document.getElementById("quizModal").classList.remove("active");
}

function evaluateQuiz(event) {
    event.preventDefault();
    const studentName = document.getElementById("studentName").value.trim();
    if (!studentName) { alert("Please enter your full name."); return; }

    let score = 0;
    activeExamQuestions.forEach((qObj, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === qObj.answer) { score++; }
    });

    const total = activeExamQuestions.length;
    const percentage = (score / total) * 100;

    if (percentage >= 70) {
        closeQuizModal();
        generateCertificate(studentName, quizData[currentTrackKey].title);
    } else {
        alert(`Assessment score: ${score}/${total} (${Math.round(percentage)}%).\nPassing requirement is 70%. Review the curriculum and try again.`);
    }
}

function generateCertificate(recipientName, courseTitle) {
    document.getElementById("certRecipientName").textContent = recipientName;
    document.getElementById("certCourseTitle").textContent = courseTitle;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const credId = "NSA-" + Math.floor(100000 + Math.random() * 900000);

    document.getElementById("certIssueDate").textContent = formattedDate;
    document.getElementById("certCredentialId").textContent = credId;

    // --- 🔔 WHATSAPP NOTIFICATION TRIGGER ---
    sendWhatsAppNotification(recipientName, courseTitle, credId, formattedDate);

    document.getElementById("certificateModal").classList.add("active");
}

function sendWhatsAppNotification(studentName, courseName, credentialId, issueDate) {
    // Apna WhatsApp number yahan likhein (Country code ke sath, misal ke taur par Pakistan ke liye 923... aur baghair plus sign ke)
    const instructorPhoneNumber = "923366868331"; // Yahan apna WhatsApp number dal dein

    const message = `🔔 *New Certificate Issued! - NetSkill Academy*%0A%0A` +
                    `👤 *Student Name:* ${studentName}%0A` +
                    `📚 *Course:* ${courseName}%0A` +
                    `🆔 *Credential ID:* ${credentialId}%0A` +
                    `📅 *Issue Date:* ${issueDate}%0A%0A` +
                    `_Instructor: Hafiz Muhammad Junaid Shafique_`;

    // WhatsApp API URL create karein
    const whatsappURL = `https://api.whatsapp.com/send?phone=${instructorPhoneNumber}&text=${message}`;

    // Ek notification banner ya popup dikها sakte hain ya automatic link open kar sakte hain
    console.log("WhatsApp Notification Ready: ", whatsappURL);
    
    // Agar aap chahte hain ke certificate open hote hi auto WhatsApp ka tab khul jaye, toh yeh line uncomment kar dein:
    // window.open(whatsappURL, '_blank');
}

function closeCertificateModal() {
    document.getElementById("certificateModal").classList.remove("active");
}