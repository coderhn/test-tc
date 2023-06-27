import './dashboard.less';
import { hooks } from '@wove/react';
import { Button } from 'antd';
import { useState } from 'react';

export const Dashboard = () => {
  const [count, setCount] = useState(0);
  const countter = hooks.useCallbackRef(() => {
    setCount(count + 1);
  });

  return (
    <div>
      <p> This is example template</p>
      <p>
        <span className="text-red-800">${count}</span>
      </p>
      <p>
        <Button onClick={countter}>Counter</Button>
      </p>
    </div>
  );
};
