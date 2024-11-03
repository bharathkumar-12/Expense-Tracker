<template>
	<div class="max-w-fit hidden lg:flex overflow-hidden" id="chart_div"></div>
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
			// Check if google is already loaded
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
    // Load the Visualization API and the corechart package.
    google.charts.load("current", { packages: ["corechart"] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(() => {
        // Create the data table.
        const data = new google.visualization.DataTable();
        data.addColumn("string", "Date");
        data.addColumn("number", "Income");
        data.addColumn("number", "Expense");

        data.addRows(this.transactions);

        // Set chart options for a polished, gradient-filled look
        const options = {
            height: 250, // Compact height for a modern look
            backgroundColor: 'transparent', // Transparent background for a clean appearance
            hAxis: {
                baselineColor: 'transparent', // Remove x-axis baseline
                gridlines: { color: 'transparent' }, // Hide x-axis gridlines
                textPosition: 'none' // Hide x-axis labels
            },
            vAxis: {
                baselineColor: 'transparent', // Hide y-axis baseline
                gridlines: { color: 'transparent' }, // Hide y-axis gridlines
                textPosition: 'none' // Hide y-axis labels
            },
            legend: { position: 'none' }, // Hide legend for minimalist style
            series: {
                0: { 
                    color: '#4CAF50',  // Rich green color for the line
                    areaOpacity: 0.2, 
                    lineWidth: 3, 
                    pointSize: 5, 
                    fillOpacity: 1,
                    fill: {
                        type: 'gradient', // Mimic a gradient effect by setting areaOpacity
                        color1: '#4CAF50', // Deep green start
                        color2: '#A5D6A7', // Light green end
                    }
                },
                1: { 
                    color: '#EF5350',  // Rich red color for the line
                    areaOpacity: 0.2, 
                    lineWidth: 3, 
                    pointSize: 5, 
                    fillOpacity: 1,
                    fill: {
                        type: 'gradient', // Mimic gradient fill
                        color1: '#EF5350', // Deep red start
                        color2: '#FFCDD2', // Light red end
                    }
                }
            },
            isStacked: false,
            curveType: 'function', // Smooth, curvy lines for a modern aesthetic
            chartArea: { width: '90%', height: '80%' } // Adjust chart area for compact layout
        };

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.AreaChart(
            document.getElementById("chart_div")
        );
        chart.draw(data, options);
    });
}





	},
};
</script>

<style scoped>
#chart_div {
	margin: auto;
}
</style>
