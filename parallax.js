/*
    MIT License

    Copyright (c) 2019 Jaebe Studio

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

   Contributed by Przemysław Kula <przemyslaw.kula@jaebestudio.com>
*/

class Parallax {
    _layers = [];
    _containerHeight = 0;
    _scrollAreaHeight = 0;
    _onResizeListener;
    _onScrollListener;
    _config = {
        includeContainerHeight: true
    };

    constructor(container, config) {
        this._container = container;
        this._config = {...this._config, ...config};
        this._onResizeListener = this._onResize.bind(this);
        this._onScrollListener = this._onResize.bind(this);
    }

    _onResize() {
        this._recalculateElementsSizes();
        this._repositionLayers()
    }

    addLayer(layer, scrollMultiplier) {
        let layerHeight = layer.offsetHeight;
        this._layers.push({elem: layer, multiplier: scrollMultiplier, height: layerHeight});
    }

    _recalculateElementsSizes() {
        const windowInnerHeight = window.innerHeight;
        this._containerHeight = this._container.offsetHeight;
        this._scrollAreaHeight = windowInnerHeight + (this._config.includeContainerHeight ? this._containerHeight : 0);

        for (let i = 0; i < this._layers.length; i++) {
            this._layers[i].height = this._layers[i].elem.offsetHeight;
        }
    }

    _repositionLayers() {
        let containerOffset = this._container.getBoundingClientRect();
        let top = containerOffset.top + this._containerHeight;

        if (top > 0 && top < this._scrollAreaHeight) {
            for (let i = 0; i < this._layers.length; i++) {
                const layer = this._layers[i];
                const layerScrollDistance = (this._containerHeight - layer.height);
                this.mainMultiplier = this._scrollAreaHeight / layerScrollDistance;
                layer.elem.style.transform = 'translateY(' + (((top / this.mainMultiplier) - layerScrollDistance) * layer.multiplier * -1) + 'px)';
            }
        }
    }

    start(){
        window.addEventListener('scroll', this._onScrollListener);
        window.addEventListener('resize', this._onResizeListener);

        this._recalculateElementsSizes();
        this._repositionLayers();
    }

    stop(){
        window.removeEventListener('scroll',  this._onScrollListener);
        window.removeEventListener('resize', this._onResizeListener);
    }
}

export default Parallax;