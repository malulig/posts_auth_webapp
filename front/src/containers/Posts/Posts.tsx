import React, { useEffect } from "react";
import { Card, List, Spin, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPosts } from "../../store/posts/posts.async";

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div
      style={{
        height: "100%",
        overflowY: "scroll",
        scrollbarGutter: "stable",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Spin spinning={loading}>
        {error && <Typography.Text style={{ color: "red" }}>{error}</Typography.Text>}
        <List
          style={{ marginTop: 20 }}
          dataSource={posts}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: "100%", textAlign: "left" }} title={item.title}>
                {item.description}
              </Card>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};

export default Posts;
