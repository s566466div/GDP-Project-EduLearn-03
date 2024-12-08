import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary elements
ChartJS.register(LinearScale, CategoryScale, BarElement, ArcElement, Tooltip, Legend);
const EngagementStats = () => {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Days of the week
        datasets: [
            {
                label: 'Hrs',
                data: [1, 1.5, 1, 1.8, 2.2, .9, 1.6], // Engagement data for each day
                backgroundColor: '#36A2EB',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true, // Start Y axis at 0
                title: {
                    display: true,
                    text: 'Hrs',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Day of the Week',
                },
            },
        },
        maintainAspectRatio: false, // Adjust chart to fit container size
    };

    return (
        <div className="engagement-stats">
            <h2>Weekly Engagement</h2>
            <div style={{ width: '600px', height: '400px' }}> {/* Control size of the chart */}
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default EngagementStats;
