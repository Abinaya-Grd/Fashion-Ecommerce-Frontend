function initFooter() {

    const form = document.getElementById("newsletterForm");

    if (!form) {
        console.log("Newsletter form not found");
        return;
    }

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = document.getElementById("newsletterEmail").value;

        alert("Thanks for subscribing!\n" + email);

        this.reset();

    });

}