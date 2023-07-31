import PageWrapper from '@/components/partials/PageWrapper';
import Spinner from '@/components/partials/Spinner';
import { Card, Select } from '@/components/shared';
import { useGetTopNewsQuery } from '@/services/newsApi';
import HTMLReactParser from 'html-react-parser';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { SelectOption } from '@/types';
import { useState } from 'react';

const categoryOptions: SelectOption<string>[] = [
  { label: 'Coin Currency', value: 'coincu' },
  { label: 'Coin Desk', value: 'coindesk' },
  { label: 'Coin Telegraph', value: 'cointelegraph' },
  { label: 'Coin Journal', value: 'coinjournal' },
  { label: 'Yahoo Finance', value: 'yahoo' },
];
const NewsPage = () => {
  const [category, setCategory] = useState<SelectOption<string>>(categoryOptions[0]);
  const { data: cryptoNews, isFetching, isError } = useGetTopNewsQuery({ category: category.value });
  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    toast.error("Couldn't Data fetch");
  }

  type DataType = (typeof cryptoNews)[0];

  const handleCategory = (selected: SelectOption<string> | null) => {
    if (selected) {
      setCategory(selected);
    }
  };
  const handleNewsClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <PageWrapper title="News" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-medium">All News</h2>
        <div className="flex flex-wrap items-start gap-2 md:items-center">
          <label htmlFor="category">Category</label>
          <Select
            placeholder="Select Category"
            className="w-56"
            id="category"
            options={categoryOptions}
            value={{ label: category.label, value: category.value }}
            onChange={handleCategory}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cryptoNews?.map((news: DataType, index: number) => {
          return (
            <Card clickable key={index} onClick={() => handleNewsClick(news.url)}>
              <Card.Body className="space-y-4">
                <h2 className="text-sm font-medium">{news.title}</h2>
                <img src="images/thum.jpg" className="h-[200px] w-full rounded-primary" alt="news-img" />

                <span className="text-xs font-normal"> {HTMLReactParser(news.description)}</span>
                <div className="flex items-center justify-between gap-2">
                  <img
                    src="images/user-thum.png"
                    alt="user-img"
                    className="border-3 h-[40px] w-[40px] rounded-full border-primary-500"
                  />
                  <p className="text-xs font-normal">{moment(news.date).startOf('hour').fromNow()}</p>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
};

export default NewsPage;
