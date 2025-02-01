class Rod {
    currentTime = 0

    constructor(selector, width, height, properties) {
        this.width = width;
        this.height = height;
        this.properties = properties;
        this.rodElement = d3.select(selector)
            .attr("width", this.width)
            .attr("height", this.height)

        this.timePoints = Array(this.properties.duration)
            .fill(0)
            .map(x => Array(this.properties.divisions + 1).fill(0));
    }

    getCellWidth() {
        return this.width / (this.properties.divisions + 1)
    }

    getX(position) {
        return (this.properties.length / this.properties.divisions) * position
    }

    getT(current) {
        return (current / 1000);
    }

    applyInitialConditions() {
        for (let t = 0; t <= 10000; t++) {
            for (let j = 0; j < this.timePoints[t].length; j++) {
                this.timePoints[t][j] = 10 * this.getT(t) * Math.sin((Math.PI * this.getX(j)) / this.properties.length)
            }
        }
    }

    renderRod() {
        this.rodElement = this.rodElement.selectAll(".bar")
            .data(this.timePoints[0])
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => i * this.getCellWidth())
            .attr("y", 0)
            .attr("width", this.getCellWidth())
            .attr("height", this.height)
            .attr("fill", d => d3.interpolateRdYlBu(1 - d / 100));

        this.renderCharts();

    }

    applyHeatEquation() {
        for (let t = 10000; t < this.timePoints.length; t++) {
            let new_t = t - 10000;
            for (let j = 0; j < this.timePoints[t].length; j++) {
                this.timePoints[t][j] = 100 * Math.exp(
                    -1 * (
                        ((Math.PI / this.properties.length) ** 2)
                        * (this.properties.alpha) * this.getT(new_t)
                    )
                ) * Math.sin(
                    (Math.PI * this.getX(j)) / this.properties.length
                )
            }
        }
    }

    updateTime(t) {
        this.properties.elements.timer.innerText = t;
    }

    updateRod() {
        var loop = setInterval(e => {
            if (this.currentTime <= this.properties.duration) {
                this.rodElement
                    .data(this.timePoints[this.currentTime])
                    .attr("fill", d => d3.interpolateRdYlBu(1 - d / 100));

                this.updateTime(this.currentTime);
                this.mphChart.update(this.timePoints[this.currentTime])
                this.currentTime += 1;
            } else {
                clearInterval(loop)
            }
        }, 1);
    }

    renderCharts() {
        const mphConfig = this.properties.elements.charts.mph;
        this.mphChart = new MomentPositionHeat(
            mphConfig.selector,
            {
                width: mphConfig.width,
                height: mphConfig.height,
                length: this.properties.length
            }
        ).render(this.timePoints[0])
    }


    simulate() {
        this.applyInitialConditions();
        this.applyHeatEquation();
        this.renderRod();
        this.updateRod();
    }
}

class MomentPositionHeat {
    constructor(selector, properties) {
        this.properties = properties;
        this.element = d3.select(selector)
            .attr("width", this.properties.width)
            .attr("height", this.properties.height);
        const margin = {top: 20, right: 10, bottom: 30, left: 50};
        this.width = this.properties.width - margin.left - margin.right;
        this.height = this.properties.height - margin.top - margin.bottom;
        this.g = this.element
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

    }

    render(initData) {

        this.x = d3.scaleLinear().rangeRound([0, this.width]).domain([0, initData.length]);
        this.y = d3.scaleLinear().rangeRound([this.height, 0]).domain([0, 100]);

        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${this.height})`)
            .call(
                d3.axisBottom(this.x)
                    .tickFormat(d => (d * (this.properties.length / initData.length)).toFixed(1))
            );

        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.y))
            .selectAll("text")
            .style("text-anchor", "start")
            .attr("x", -10);

        this.bars = this.g.selectAll(".bar")
            .data(initData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => this.x(i))
            .attr("y", d => this.y(d))
            .attr("width", this.x(1) - this.x(0) - 1)
            .attr("height", d => this.height - this.y(d));

        return this;
    }

    update(newData) {
        this.bars.data(newData)
            .attr("y", d => this.y(d))
            .attr("height", d => this.height - this.y(d))
            .attr("fill", d => d3.interpolateRdYlBu(1 - d / 100));
    }
}