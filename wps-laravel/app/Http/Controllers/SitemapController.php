<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\News;
use App\Models\Partner;
use App\Models\Hotel;
use App\Models\Competition;
use App\Models\Award;
use Illuminate\Support\Facades\Response;

class SitemapController extends Controller
{
    private $baseUrl = 'https://worldpublicsummit.test';

    /**
     * Generate sitemap index with links to language-specific sitemaps
     */
    public function index()
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        $xml .= '  <sitemap>' . "\n";
        $xml .= '    <loc>' . route('sitemap.russian') . '</loc>' . "\n";
        $xml .= '    <lastmod>' . now()->toAtomString() . '</lastmod>' . "\n";
        $xml .= '  </sitemap>' . "\n";
        $xml .= '  <sitemap>' . "\n";
        $xml .= '    <loc>' . route('sitemap.english') . '</loc>' . "\n";
        $xml .= '    <lastmod>' . now()->toAtomString() . '</lastmod>' . "\n";
        $xml .= '  </sitemap>' . "\n";
        $xml .= '</sitemapindex>';

        return Response::make($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8'
        ]);
    }

    /**
     * Generate Russian language sitemap
     */
    public function russian()
    {
        return $this->generateSitemap('ru');
    }

    /**
     * Generate English language sitemap
     */
    public function english()
    {
        return $this->generateSitemap('en');
    }

    /**
     * Generate sitemap for specific language
     */
    private function generateSitemap($locale)
    {
        $urls = [];

        // Static pages
        $urls[] = [
            'loc' => "{$this->baseUrl}/{$locale}/",
            'changefreq' => 'weekly',
            'priority' => '1.0',
            'lastmod' => now()->toAtomString()
        ];

        $urls[] = [
            'loc' => "{$this->baseUrl}/{$locale}/program",
            'changefreq' => 'weekly',
            'priority' => '0.8',
            'lastmod' => now()->toAtomString()
        ];

        $urls[] = [
            'loc' => "{$this->baseUrl}/{$locale}/press-center",
            'changefreq' => 'daily',
            'priority' => '0.8',
            'lastmod' => now()->toAtomString()
        ];

        $urls[] = [
            'loc' => "{$this->baseUrl}/{$locale}/participants",
            'changefreq' => 'weekly',
            'priority' => '0.7',
            'lastmod' => now()->toAtomString()
        ];

        $urls[] = [
            'loc' => "{$this->baseUrl}/{$locale}/partners",
            'changefreq' => 'monthly',
            'priority' => '0.7',
            'lastmod' => now()->toAtomString()
        ];

        $urls[] = [
            'loc' => "{$this->baseUrl}/{$locale}/hotels",
            'changefreq' => 'monthly',
            'priority' => '0.6',
            'lastmod' => now()->toAtomString()
        ];

        // Dynamic pages - Events
        $events = Event::where('status', 'published')->select('id', 'updated_at')->get();
        foreach ($events as $event) {
            $urls[] = [
                'loc' => "{$this->baseUrl}/{$locale}/program/{$event->id}",
                'changefreq' => 'monthly',
                'priority' => '0.7',
                'lastmod' => $event->updated_at->toAtomString()
            ];
        }

        // Dynamic pages - News
        $news = News::where('status', 'published')->select('id', 'updated_at')->get();
        foreach ($news as $newsItem) {
            $urls[] = [
                'loc' => "{$this->baseUrl}/{$locale}/news/{$newsItem->id}",
                'changefreq' => 'monthly',
                'priority' => '0.6',
                'lastmod' => $newsItem->updated_at->toAtomString()
            ];
        }

        // Build XML
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . "\n";
        $xml .= '         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' . "\n";
        $xml .= '         xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">' . "\n";

        foreach ($urls as $url) {
            $xml .= '  <url>' . "\n";
            $xml .= '    <loc>' . htmlspecialchars($url['loc']) . '</loc>' . "\n";
            $xml .= '    <lastmod>' . $url['lastmod'] . '</lastmod>' . "\n";
            $xml .= '    <changefreq>' . $url['changefreq'] . '</changefreq>' . "\n";
            $xml .= '    <priority>' . $url['priority'] . '</priority>' . "\n";
            $xml .= '  </url>' . "\n";
        }

        $xml .= '</urlset>';

        return Response::make($xml, 200, [
            'Content-Type' => 'application/xml; charset=utf-8'
        ]);
    }
}
