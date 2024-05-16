async function generate() {
    const textarea1 = document.getElementById("textarea1");
    const textarea2 = document.getElementById("textarea2");
    const spinner = document.getElementById("spinner");
    const payload = {text: textarea1.value}
    console.log(JSON.stringify(payload))
    console.log(payload)
    const response = await fetch(
        "http://localhost:3000/app",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {'Content-Type': 'application/json'}
        }
      );
      spinner.classList.toggle("hidden")
      response.json().then(data=>{textarea2.innerText = data.text;
        spinner.classList.toggle("hidden")})
  }