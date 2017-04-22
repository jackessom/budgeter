import React from 'react';
import { Card, CardTitle, CardActions, IconButton } from 'react-toolbox';
import styles from './header.css';

const Header = () => (
  <Card style={{ width: '100%' }}>
    <CardTitle
      title="January"
      subtitle="2017"
      className={styles.title}
    >
      <IconButton icon="chevron_left" className={styles.navLeft} />
      <IconButton icon="chevron_right" className={styles.navRight} />
    </CardTitle>
    <CardActions>
      <IconButton icon="settings" />
    </CardActions>
  </Card>
);

export default Header;
