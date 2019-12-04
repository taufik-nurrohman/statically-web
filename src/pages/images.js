import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

class ImagesPage extends React.Component {

  createQueryString(data) {
    let results = [], k, v;
    for (k in data) {
      v = data[k];
      v !== "" && results.push(encodeURIComponent(k) + (v === true ? "" : '=' + encodeURIComponent(v)));
    }
    return results.length ? '?' + results.join('&') : "";
  }

  isValidImageLink = value => {
    return /^https?:\/\/\S+\.(bmp|gif|jpe?g|png|svg|webp)$/i.test(value.split('?')[0]); // Ignore query string URL
  }

  setSourceRef = source => {
    this.source = source;
  }

  handleInputChange = () => {
    let {from, to, w, h, quality, crop, format, filter} = this.source;
    let value = from.value,
        data = {};
    data.w = w.value;
    data.h = h.value;
    data.quality = quality.value;
    data.crop = crop.value;
    data.format = format.checked ? format.value : "";
    data.filter = filter.checked ? filter.value : "";
    to.parentNode.parentNode.classList.remove('hidden');
    to.value = this.isValidImageLink ? 'https://cdn.statically.io/img/' + value.replace(/^https?:\/\//, "") + this.createQueryString(data) : "";
  }

  hideResultIfEmpty = () => {
    let {from, to} = this.source;
    to.parentNode.parentNode.classList[this.isValidImageLink(from.value) ? 'remove' : 'add']('hidden');
  }

  handleInputPaste = () => {
    setTimeout(() => {
      this.handleInputChange();
      let {to} = this.source;
      to.parentNode.parentNode.classList.add('hidden');
      if (this.isValidImageLink(this.source.from.value)) {
        to.parentNode.parentNode.classList.remove('hidden');
        to.focus();
        to.select();
      }
    }, 0);
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <Layout>
        <SEO
          title="Images"
          description="The free &amp; fast image optimization and transformation for modern web development."
          keywords={[`statically`]}
        />

        <div className="px-4 py-8 md:p-8">

          <section className="mb-24 text-center max-w-4xl mx-auto px-4 md:px-0">
            <h1 className="text-3xl font-bold inline-block max-w-3xl my-8 p-3">
              The free &amp; fast image optimization and transformation for modern web development.
            </h1>

            <form className="container mx-auto mb-20 md:w-2/3" onSubmit={this.handleSubmit} ref={this.setSourceRef}>

              <div className="highlighted-form">
                <input className="bg-white focus:outline-none rounded-lg py-3 px-5 block w-full appearance-none leading-normal mx-auto shadow-lg focus:shadow-xl text-center text-lg" id="e:from" name="from" type="text" onChange={this.hideResultIfEmpty} onPaste={this.handleInputPaste} placeholder="Paste an image URL here!" />
              </div>

              <div className="mt-4 hidden">

                <div>
                  <label className="font-bold" htmlFor="e:to">Use this URL in production:</label>
                  <input className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-2 mx-auto shadow-lg focus:shadow-xl text-center" id="e:to" name="to" type="text" />
                </div>

                <h3 className="mt-6 mb-3 pt-4 border-t font-semibold text-xl text-center">Common Settings</h3>

                <div className="flex flex-wrap -mx-3 text-left">
                  <div className="w-full md:w-1/2 p-3">
                    <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="e:w">
                      Width
                    </label>
                    <input className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-2 mx-auto shadow-lg focus:shadow-xl" id="e:w" name="w" placeholder="72" onChange={this.handleInputChange} type="text" />
                  </div>
                  <div className="w-full md:w-1/2 p-3">
                    <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="e:h">
                      Height
                    </label>
                    <input className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-2 mx-auto shadow-lg focus:shadow-xl" id="e:h" name="h" placeholder="72" onChange={this.handleInputChange} type="text" />
                  </div>
                  
                  <div className="w-full md:w-1/2 p-3">
                    <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="e:quality">
                      Quality
                    </label>
                    <input className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-2 mx-auto shadow-lg focus:shadow-xl" id="e:quality" name="quality" placeholder="10-100" onChange={this.handleInputChange} type="text" />
                  </div>
                  <div className="w-full md:w-1/2 p-3">
                    <label className="block tracking-wide text-xs font-bold mb-2" htmlFor="e:crop">
                      Crop
                    </label>
                    <input className="bg-white focus:outline-none border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-2 mx-auto shadow-lg focus:shadow-xl" id="e:crop" name="crop" placeholder="<x>,<y>,<w>,<h>" onChange={this.handleInputChange} type="text" />
                  </div>

                  <div className="mx-3 mt-4">
                    <label className="flex items-center h-4" htmlFor="e:filter">
                      <input id="e:filter" className="mr-2" name="filter" onChange={this.handleInputChange} type="checkbox" value="grayscale" />
                      <span>Grayscale</span>
                    </label>
                  </div>
                  <div className="mx-3 mt-4">
                    <label className="flex items-center h-4" htmlFor="e:format">
                      <input id="e:format" className="mr-2" name="format" onChange={this.handleInputChange} type="checkbox" value="webp" />
                      <span>Force WebP</span>
                    </label>
                  </div>
                </div>

              </div>
            </form>

            <div className="flex content-center flex-wrap">
              <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 mb-3 max-w-sm overflow-hidden mx-auto">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">URL-based API</div>
                  <p className="text-gray-700 text-base">
                    Completely free, control image transformation using URL parameters.
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 mb-3 max-w-sm overflow-hidden mx-auto">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Smart optimization</div>
                  <p className="text-gray-700 text-base">
                    Automatic compress and remove unnecessary metadata from your image for blazing fast delivery.
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 mb-3 max-w-sm overflow-hidden mx-auto">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Works with your website</div>
                  <p className="text-gray-700 text-base">
                    Allows pulling content from your website and reduce server load from delivering static assets.
                  </p>
                </div>
              </div>
            </div>

          </section>
  
        </div>
      </Layout>
    );
  }

}

export default ImagesPage;