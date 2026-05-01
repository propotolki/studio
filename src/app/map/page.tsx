import { AppHeader } from '@/components/app-header';
import { YandexMap } from '@/components/map/yandex-map';

const mockPoints = [
  { id: '1', title: 'Объект 1', lat: 55.751244, lng: 37.618423 },
  { id: '2', title: 'Объект 2', lat: 55.761244, lng: 37.628423 },
];

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="container mx-auto p-4 sm:p-6 md:p-8 space-y-4">
        <h1 className="text-3xl font-bold">Карта объектов</h1>
        <YandexMap points={mockPoints} />
      </div>
    </div>
  );
}
