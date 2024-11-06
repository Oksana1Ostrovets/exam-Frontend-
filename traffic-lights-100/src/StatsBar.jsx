import React from 'react';
import PropTypes from 'prop-types';

const StatsBar = ({ clicks, onToggle }) => {
  return (
    <div className="text-center p-4">
      <button onClick={onToggle} className="btn btn-primary mb-4">
        Перемкнути орієнтацію
      </button>
      <ul>
        <li>Червоний: {clicks.red}</li>
        <li>Жовтий: {clicks.yellow}</li>
        <li>Зелений: {clicks.green}</li>
      </ul>
    </div>
  );
};

StatsBar.propTypes = {
  clicks: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default StatsBar;
