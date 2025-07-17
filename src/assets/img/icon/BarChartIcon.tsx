import type { FC, ReactElement } from 'react';
import '../../../styles/baseComponentsStyles/barChartIconAnimation.scss';

interface BarChartIconProps {
  className?: string;
}

const BarChartIcon: FC<BarChartIconProps> = ({ className = '' }): ReactElement => {
  return (
    <div className={`bar-chart-icon ${className}`}>
      <div className="bar-chart-bar left-bar" />
      <div className="bar-chart-bar right-bar" />
    </div>
  );
};

export default BarChartIcon;