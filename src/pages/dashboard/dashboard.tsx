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
      THis is example template <span className="text-red-800">${count}</span>
      <Button onClick={countter}></Button>
    </div>
  );
};
