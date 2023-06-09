import React, { useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import FeedCard from '../components/homepage/FeedCard';
import NewPost from '../components/homepage/NewPost';
import Loader from '../components/Loader';
import { useGetUserPostQuery } from '../store/user-posts/userPosts';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const state = useSelector((state) => state.Profile);
  console.log(state);
  const pageNumber = Number(searchParams.get('page'))
    ? Number(searchParams.get('page'))
    : 1;
  const { data, isFetching } = useGetUserPostQuery(pageNumber);

  useEffect(() => {
    if (searchParams.get('page') === '1') {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handlePagination = (value) => {
    let count;
    if (value) {
      count = pageNumber + 1;
    } else {
      count = pageNumber - 1;
    }
    setSearchParams({ page: count });
  };
  return (
    <>
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'center', pt: '10px' }}
        spacing={2}
      >
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
              minWidth: '350px',
            }}
          >
            <Button
              variant={'contained'}
              disabled={pageNumber === 1}
              onClick={() => handlePagination(false)}
            >
              Prev
            </Button>
            <Button
              variant={'contained'}
              disabled={data?.data?.length <= 0}
              onClick={() => handlePagination(true)}
            >
              Next
            </Button>
          </div>
          {isFetching ? (
            <Loader />
          ) : data?.data?.length > 0 ? (
            data?.data.map((post) => <FeedCard key={post._id} post={post} />)
          ) : (
            <h3>No data Found</h3>
          )}
        </Box>
      </Grid>
      <NewPost />
    </>
  );
};

export default HomePage;
