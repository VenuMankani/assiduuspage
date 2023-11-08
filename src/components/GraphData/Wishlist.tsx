import React, { useContext } from 'react';
import { Divider, Typography } from '@mui/material';
import styles from './graphData.module.css';
import { PageContext } from '../context/ContextProvider';

const Wishlist = () => {

    const contextValue = useContext(PageContext);
    const watchlistData = contextValue.watchlistData;

    return (
        <div className={styles.Container}>
            <Typography variant="h6" paddingTop={'1rem'} paddingBottom={'1.5rem'} paddingLeft={'1rem'} fontWeight={700}>
                Account watchlist
            </Typography>
            <Divider orientation='horizontal' />
            <div className={styles.table}>
                <div className={styles.section1}>
                    <Typography fontWeight={700} fontSize={13} marginBottom={'0.75rem'} color={'lightgray'}>Account</Typography>
                    {watchlistData.map((col, idx) =>
                        <Typography fontWeight={700} key={idx}>{col.account}</Typography>
                    )}
                </div>
                <div className={styles.section2}>
                    <div className={styles.month}>
                        <Typography fontWeight={700} fontSize={13} marginBottom={'0.75rem'} color={'lightgray'}>This Month</Typography>
                        {watchlistData.map((col, idx) =>
                            <Typography fontWeight={700} key={idx}>{col.month}</Typography>
                        )}
                    </div>
                    <div className={styles.ytd}>
                        <Typography fontWeight={700} fontSize={13} marginBottom={'0.75rem'} color={'lightgray'}>YTD</Typography>
                        {watchlistData.map((col, idx) =>
                            <Typography fontWeight={700} key={idx}>{col.ytd}</Typography>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
