<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h2 class="font-headline text-lg font-bold text-on-surface">Cash Flow Analysis</h2>
        <p class="text-sm text-on-surface-variant">Income vs Expenses Trend</p>
      </div>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <div class="w-2 h-4 rounded-sm bg-secondary"></div>
          <span class="text-xs text-on-surface-variant font-medium">Income</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-2 h-4 rounded-sm bg-error"></div>
          <span class="text-xs text-on-surface-variant font-medium">Expenses</span>
        </div>
      </div>
    </div>
    <div id="chart_div" class="relative w-full h-[260px]"></div>
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
          height: 260,
          backgroundColor: 'transparent',
          chartArea: { width: '94%', height: '85%', left: '6%' },
          hAxis: {
            textStyle: { color: '#adaaaa', fontSize: 10 },
            baselineColor: 'transparent',
            gridlines: { color: '#131313', count: 8 },
            minorGridlines: { color: '#131313', count: 0 }
          },
          vAxis: {
            textStyle: { color: '#adaaaa', fontSize: 10 },
            baselineColor: '#262626',
            gridlines: { color: '#1a1a1a', count: 6 },
            minorGridlines: { color: '#1a1a1a', count: 1 },
            minValue: 0,
            format: 'short'
          },
          legend: { position: 'none' },
          series: {
            0: {
              color: '#6ffb85',
              areaOpacity: 0.12,
              lineWidth: 2.5,
              pointSize: 0,
            },
            1: {
              color: '#ff716c',
              areaOpacity: 0.12,
              lineWidth: 2.5,
              pointSize: 0,
            }
          },
          isStacked: false,
          curveType: 'function',
          interpolateNulls: true,
          crosshair: { trigger: 'both', color: '#484847', opacity: 0.4, orientation: 'vertical' },
          focusTarget: 'category',
          tooltip: {
            textStyle: { color: '#ffffff', fontSize: 12, fontName: 'Inter' },
            showColorCode: true,
            backgroundColor: '#1a1a1a',
            borderColor: '#262626',
            boxStyle: { stroke: '#262626', strokeWidth: 1, rx: 6, ry: 6 }
          },
          animation: { startup: true, duration: 1000, easing: 'out' }
        };

        const smoothedData = new google.visualization.DataTable();
        smoothedData.addColumn("string", "Date");
        smoothedData.addColumn("number", "Income");
        smoothedData.addColumn("number", "Expense");

        const windowSize = 3;
        const rows = data.getNumberOfRows();
        for (let i = 0; i < rows; i++) {
          const date = data.getValue(i, 0);
          let incomeSum = 0, expenseSum = 0, count = 0;
          for (let j = Math.max(0, i - windowSize); j <= Math.min(rows - 1, i + windowSize); j++) {
            incomeSum += data.getValue(j, 1);
            expenseSum += data.getValue(j, 2);
            count++;
          }
          smoothedData.addRow([date, incomeSum / count, expenseSum / count]);
        }

        const chart = new google.visualization.AreaChart(document.getElementById("chart_div"));
        chart.draw(smoothedData, options);

        window.addEventListener('resize', () => chart.draw(smoothedData, options));
      });
    }
  },
};
</script>

<style scoped>
:deep(.google-visualization-tooltip) {
  border-radius: 8px !important;
  padding: 12px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
}
:deep(path) {
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>
