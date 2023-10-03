type PageHeadingProps = {
    title: string;
};
  
const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
    return <h1 className='text-3xl font-semibold mb-10'>{title}</h1>
}

export default PageHeading;
