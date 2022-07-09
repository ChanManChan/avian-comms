class Container {
    _ratios = ['4:3', '16:9', '1:1', '1:2']
    _dish = false
    _conference = false
    _cameras = 4
    _margin = 10
    _aspect = 0
    _video = false
    _ratio = this.ratio()

    constructor(container) {
        this._container = container

        this.create()
        this.render()

        return this
    }

    append() {
        this._container.appendChild(this._conference)
    }

    resize() {
        this.dimensions()
        let max = 0
        let i = 0

        while (i < 5000) {
            let area = this.area(i)
            if (area === false) {
                max = i - 1
                break
            }
            i++
        }

        max = max - (this._margin * 2)
        this.resizer(max)
    }

    resizer(width) {
        for (let s = 0; s < this._dish.children.length; s++) {
            const element = this._dish.children[s]
            element.style.margin = this._margin + 'px'
            element.style.width = width + 'px'
            element.style.height = (width * this._ratio) + 'px'
            element.setAttribute('data-aspect', this._ratios[this._aspect])
        }
    }

    area(increment) {
        let i = 0
        let w = 0
        let h = increment * this._ratio + (this._margin * 2)

        while (i < this._dish.children.length) {
            if (w + increment > this._width) {
                w = 0
                h = h + (increment * this._ratio) + (this._margin * 2)
            }
            w = w + increment + (this._margin * 2)
            i++
        }

        if (h > this._height || increment > this._width) return false
        return increment
    }

    dimensions() {
        this._width = this._dish.offsetWidth - (this._margin * 2)
        this._height = this._dish.offsetHeight - (this._margin * 2)
    }

    create() {
        this._conference = document.createElement('div')
        this._conference.classList.add('conference')

        this._dish = document.createElement('div')
        this._dish.classList.add('dish')

        this._conference.appendChild(this._dish)
    }

    render() {
        if (this._dish.children) {
            for (let i = this._cameras; i < this._dish.children.length; i++) {
                let Camera = this._dish.children[i]
                this._dish.removeChild(Camera)
            }
        }

        for (let i = this._dish.children.length; i < this._cameras; i++) {
            let Camera = document.createElement('div')
            this._dish.appendChild(Camera)
        }
    }

    ratio() {
        const ratio = this._ratios[this._aspect].split(":")
        return ratio[1] / ratio[0]
    }
}

export { Container }