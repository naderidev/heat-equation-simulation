document.addEventListener("DOMContentLoaded", e => {
    document.getElementById("simulate-btn").addEventListener("click", r => {
        const alpha = parseFloat(document.getElementById("alpha-value").value);
        const rod_length = parseFloat(document.getElementById("rod-length").value);
        const duration = parseInt(document.getElementById("duration-value").value);
        document.getElementById("setup-sec").classList.add("d-none");
        document.getElementById("simulation-sec").classList.remove("d-none");

        document.getElementById("length-element").innerText = rod_length;
        document.getElementById("alpha-element").innerText = alpha;
        new Rod(
            "#rod",
            800,
            70,
            {
                length: rod_length,
                divisions: 100,
                duration: duration,
                alpha: alpha,
                elements: {
                    timer: document.getElementById("timer"),
                    charts: {
                        mph: {
                            selector: "#moment-position-heat",
                            height: 280,
                            width: 800,
                        }
                    }
                }
            }
        ).simulate();
    });
});