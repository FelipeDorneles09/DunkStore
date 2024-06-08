class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000); // Redireciona após 3 segundos
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000); // Redireciona após 3 segundos
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        this.formButton.disabled = true;
        this.formButton.innerText = "Enviando...";
    }

    async sendForm(event) {
        this.onSubmission(event);
        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });

            if (response.ok) {
                this.displaySuccess();
            } else {
                this.displayError();
            }
        } catch (error) {
            this.displayError();
        } finally {
            this.formButton.disabled = false;
            this.formButton.innerText = "Enviar";
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<div class='post'><h1 class='success'>Mensagem enviada!</h1><h2 class='redirect'>Você será redirecionado em alguns segundos.</h2></div>",
    error: "<div class='post'><h1 class='error'>Não foi possível enviar a mensagem!</h1><h2 class='redirect'>Você será redirecionado em alguns segundos.</h2></div>"
});

formSubmit.init();
