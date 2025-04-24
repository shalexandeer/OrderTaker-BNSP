import React from 'react';

interface CardRestaurantProps {
  children: React.ReactNode;
  className?: string;
}

const CardRestaurant = ({ children, className }: CardRestaurantProps) => {
  return <div className={className}>{children}</div>;
};

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

const Body = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

CardRestaurant.Title = Title;
CardRestaurant.Body = Body;

export default CardRestaurant;
