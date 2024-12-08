import { Pie } from 'react-chartjs-2'; // You can use chart.js or other charting libraries
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary elements
ChartJS.register(ArcElement, Tooltip, Legend);
const EnrollmentPieChart = () => {
    const data = {
        labels: ['Completed', 'In-Progress'],
        datasets: [
            {
                data: [3, 7],
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
        ],
    };

    return (
        <div className="pie-chart-component" style={{ width: '400px', height: '400px'}}>
            <h2>Enrollment Statistics</h2>
            <Pie data={data} />
        </div>
    );
};

export default EnrollmentPieChart;
