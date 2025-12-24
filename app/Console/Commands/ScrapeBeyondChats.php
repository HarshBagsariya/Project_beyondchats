<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use App\Models\Article;

class ScrapeBeyondChats extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape BeyondChats blogs';

    public function handle()
    {
        $this->info('Scraping started');

        $response = Http::get('https://beyondchats.com/blogs');

        if (!$response || !$response->successful()) {
            $this->error('Failed to fetch site');
            return;
        }

        preg_match_all('/href="([^"]+)"/', $response->body(), $matches);

        $count = 0;

        foreach ($matches[1] as $link) {
            if (!str_contains($link, '/blogs/')) continue;

            $title = Str::headline(Str::afterLast($link, '/'));
            if (strlen($title) < 5) continue;

            Article::create([
                'title' => $title,
                'slug' => Str::slug($title) . '-' . uniqid(),
                'content' => 'Initial scraped content',
                'source_url' => $link
            ]);

            $this->info("Saved: $title");
            if (++$count == 5) break;
        }

        $this->info('Scraping completed');
    }
}
