import { Component } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class Chart extends Component {
    render() {
        var { data } = this.props;

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Biểu đồ điểm',
                },
            },
        };
        var labels = [];
    
        data.map((da)=>{
            labels.push(da.TenKH);
        });

        const dat = {
            labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: labels.map((lab,index) => data[index].Diem),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };
        
        return (
            <div>
                <Bar options={options} data={dat} />
            </div>
        );
    }
}

export default Chart;