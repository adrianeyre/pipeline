import type { Metric } from 'web-vitals';

/**
 * web-vitals 6 renamed every getter (`getCLS` -> `onCLS`) and dropped FID in
 * favour of INP, which is the metric that replaced it as a Core Web Vital.
 */
const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
			onCLS(onPerfEntry);
			onFCP(onPerfEntry);
			onINP(onPerfEntry);
			onLCP(onPerfEntry);
			onTTFB(onPerfEntry);
		});
	}
};

export default reportWebVitals;
