import React from 'react';

export default ({ groups }) => <div>
  You have {!!groups.length ? groups.length : '0'} groups

  {!!groups.length && <ul>
    {groups.map(group => <li>{group.name}</li>)}
  </ul>}
</div>;
