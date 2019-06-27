import React from 'react';


export const useFilter = (data = [], fields = []) => {
  const [filter, setFilter] = React.useState('');

  const filtered = data.filter(el =>
    fields.some(field =>
      (el[field] || '')
        .toString()
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
  );

  return [filtered, filter, setFilter];
};