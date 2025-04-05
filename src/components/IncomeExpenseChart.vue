<template>
	<div class="flex flex-col gap-4">
		<div class="flex items-center justify-between">
			<div class="space-y-1">
				<h2 class="text-xl font-bold bg-gradient-to-r from-gray-200 via-indigo-200 to-gray-200 text-transparent bg-clip-text">Cash Flow Analysis</h2>
				<p class="text-sm text-gray-500">Income vs Expenses Trend</p>
			</div>
			<div class="flex items-center space-x-6">
				<div class="flex items-center space-x-2">
					<div class="w-2 h-4 rounded-sm bg-gradient-to-t from-emerald-400 to-emerald-300"></div>
					<span class="text-xs text-gray-400 font-medium">Income</span>
				</div>
				<div class="flex items-center space-x-2">
					<div class="w-2 h-4 rounded-sm bg-gradient-to-t from-rose-400 to-rose-300"></div>
					<span class="text-xs text-gray-400 font-medium">Expenses</span>
				</div>
			</div>
		</div>
		
		<div class="relative bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 overflow-hidden">
			<div class="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-purple-500/5 to-transparent"></div>
			<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700/20 via-gray-900/5 to-transparent"></div>
			<div id="chart_div" class="relative w-full h-[300px]"></div>
		</div>
	</div>
</template>

<script>
import { inject } from "vue";
export default {
	mounted() {
		this.loadGoogleCharts();
	},
	data() {
		return {
			transactions: inject("transactions"),
		};
	},
	methods: {
		loadGoogleCharts() {
			if (typeof google === "undefined") {
				const script = document.createElement("script");
				script.src = "https://www.gstatic.com/charts/loader.js";
				script.onload = this.drawChart;
				document.head.appendChild(script);
			} else {
				this.drawChart();
			}
		},
		drawChart() {
			google.charts.load("current", { packages: ["corechart"] });
			google.charts.setOnLoadCallback(() => {
				const data = new google.visualization.DataTable();
				data.addColumn("string", "Date");
				data.addColumn("number", "Income");
				data.addColumn("number", "Expense");

				data.addRows(this.transactions);

				const options = {
					height: 300,
					backgroundColor: 'transparent',
					chartArea: { 
						width: '94%', 
						height: '85%',
						left: '6%' 
					},
					hAxis: {
						textStyle: { 
							color: '#6B7280',
							fontSize: 10
						},
						baselineColor: 'transparent',
						gridlines: { 
							color: '#1F2937',
							count: 8,
						},
						minorGridlines: {
							color: '#1F2937',
							count: 0
						}
					},
					vAxis: {
						textStyle: { 
							color: '#6B7280',
							fontSize: 10
						},
						baselineColor: '#374151',
						gridlines: { 
							color: '#1F2937',
							count: 6
						},
						minorGridlines: {
							color: '#1F2937',
							count: 1
						},
						minValue: 0,
						format: '$#'
					},
					legend: { position: 'none' },
					series: {
						0: { 
							color: '#10B981',
							areaOpacity: 0.15,
							lineWidth: 2.5,
							pointSize: 0,
							pointShape: 'circle',
							fill: {
								gradient: {
									color1: '#10B981',
									color2: '#10B98100',
									x1: '0%', y1: '0%',
									x2: '0%', y2: '100%',
									useObjectBoundingBoxUnits: true
								}
							}
						},
						1: { 
							color: '#F43F5E',
							areaOpacity: 0.15,
							lineWidth: 2.5,
							pointSize: 0,
							pointShape: 'circle',
							fill: {
								gradient: {
									color1: '#F43F5E',
									color2: '#F43F5E00',
									x1: '0%', y1: '0%',
									x2: '0%', y2: '100%',
									useObjectBoundingBoxUnits: true
								}
							}
						}
					},
					isStacked: false,
					curveType: 'function',
					interpolateNulls: true,
					aggregationTarget: 'category',
					aggregationFunction: 'average',
					crosshair: { 
						trigger: 'both',
						color: '#4B5563',
						opacity: 0.4,
						orientation: 'vertical'
					},
					focusTarget: 'category',
					tooltip: {
						textStyle: { 
							color: '#F3F4F6',
							fontSize: 12,
							fontName: 'Inter'
						},
						showColorCode: true,
						backgroundColor: '#1F2937',
						borderColor: '#374151',
						boxStyle: {
							stroke: '#374151',
							strokeWidth: 1,
							rx: 6,
							ry: 6
						}
					},
					animation: {
						startup: true,
						duration: 1000,
						easing: 'out'
					}
				};

				// Add data smoothing
				const smoothedData = new google.visualization.DataTable();
				smoothedData.addColumn("string", "Date");
				smoothedData.addColumn("number", "Income");
				smoothedData.addColumn("number", "Expense");

				// Apply moving average smoothing
				const windowSize = 3;
				const rows = data.getNumberOfRows();
				for (let i = 0; i < rows; i++) {
					const date = data.getValue(i, 0);
					let incomeSum = 0;
					let expenseSum = 0;
					let count = 0;

					// Calculate moving average
					for (let j = Math.max(0, i - windowSize); j <= Math.min(rows - 1, i + windowSize); j++) {
						incomeSum += data.getValue(j, 1);
						expenseSum += data.getValue(j, 2);
						count++;
					}

					smoothedData.addRow([
						date,
						incomeSum / count,
						expenseSum / count
					]);
				}

				const chart = new google.visualization.AreaChart(
					document.getElementById("chart_div")
				);
				
				// Add custom styling to points and hover effects
				google.visualization.events.addListener(chart, 'ready', () => {
					const chartElements = document.querySelectorAll('#chart_div circle');
					chartElements.forEach(circle => {
						circle.setAttribute('stroke-width', '2');
						circle.setAttribute('stroke', '#111827');
						circle.style.opacity = '0';
						circle.style.transition = 'opacity 0.2s ease-in-out';
					});

					// Add hover effect
					const chartDiv = document.getElementById('chart_div');
					chartDiv.addEventListener('mousemove', (e) => {
						const rect = chartDiv.getBoundingClientRect();
						const x = e.clientX - rect.left;
						const y = e.clientY - rect.top;
						
						// Show points near cursor
						chartElements.forEach(circle => {
							const cx = parseFloat(circle.getAttribute('cx'));
							const cy = parseFloat(circle.getAttribute('cy'));
							const distance = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
							
							if (distance < 20) {
								circle.style.opacity = '1';
							} else {
								circle.style.opacity = '0';
							}
						});
					});

					// Reset points when mouse leaves
					chartDiv.addEventListener('mouseleave', () => {
						chartElements.forEach(circle => {
							circle.style.opacity = '0';
						});
					});
				});

				chart.draw(smoothedData, options);

				// Add responsive behavior
				window.addEventListener('resize', () => {
					chart.draw(smoothedData, options);
				});
			});
		}
	},
};
</script>

<style scoped>
.backdrop-blur-md {
	backdrop-filter: blur(12px);
}

@keyframes gradient {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}

.bg-gradient-to-r {
	background-size: 200% auto;
	animation: gradient 8s linear infinite;
}

/* Custom Google Chart Styles */
:deep(.google-visualization-tooltip) {
	border-radius: 8px !important;
	padding: 12px !important;
	box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
}

:deep(#chart_div) {
	filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

:deep(path) {
	stroke-linejoin: round;
	stroke-linecap: round;
}
</style>
