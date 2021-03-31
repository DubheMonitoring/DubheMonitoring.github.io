'use strict';

/* global cw, shp */
L.Shapefile = L.GeoJSON.extend({
	options: {
		importUrl: 'shp.js',
	},

	initialize: function (file, options) {
		L.Util.setOptions(this, options);
		if (typeof cw !== 'undefined') {
			/*eslint-disable no-new-func*/
			if (!options.isArrayBuffer) {
				this.worker = cw(
					new Function(
						'data',
						'cb',
						'importScripts("' +
							this.options.importUrl +
							'");shp(data).then(cb);'
					)
				);
			} else {
				this.worker = cw(
					new Function(
						'data',
						'importScripts("' +
							this.options.importUrl +
							'"); return shp.parseZip(data);'
					)
				);
			}
			/*eslint-enable no-new-func*/
		}
		L.GeoJSON.prototype.initialize.call(
			this,
			{
				features: [],
			},
			options
		);
		this.addFileData(file);
	},

	addFileData: function (file) {
		var self = this;
		this.fire('data:loading');
		if (typeof file !== 'string' && !('byteLength' in file)) {
			var data = this.addData(file);
			this.fire('data:loaded');
			return data;
		}
		if (!this.worker) {
			shp(file)
				.then(function (data) {
					self.addData(data);
					self.fire('data:loaded');
				})
				.catch(function (err) {
					self.fire('data:error', err);
				});
			return this;
		}
		var promise;
		if (this.options.isArrayBufer) {
			promise = this.worker.data(file, [file]);
		} else {
			promise = this.worker.data(cw.makeUrl(file));
		}

		promise
			.then(function (data) {
				self.addData(data);
				self.fire('data:loaded');
				self.worker.close();
			})
			.then(
				function () {},
				function (err) {
					self.fire('data:error', err);
				}
			);
		return this;
	},
});

L.shapefile = function (a, b, c) {
	return new L.Shapefile(a, b, c);
};
function getColor(d) {
	return d > 1000
		? '#800026'
		: d > 500
		? '#BD0026'
		: d > 200
		? '#E31A1C'
		: d > 100
		? '#FC4E2A'
		: d > 50
		? '#FD8D3C'
		: d > 20
		? '#FEB24C'
		: d > 10
		? '#FED976'
		: '#FFEDA0';
}

function style(feature) {
	return {
		fillColor: getColor(feature.properties.density),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7,
	};
}

L.geoJson(statesData, { style: style }).addTo(mymap);
