<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Partner;
use App\Models\News;
use App\Models\Award;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function home()
    {
        $events = Event::published()->limit(4)->get();
        $partners = Partner::active()->ordered()->limit(6)->get();
        $news = News::published()->latest()->limit(3)->get();

        return view('home', compact('events', 'partners', 'news'));
    }

    public function about()
    {
        return view('pages.about');
    }

    public function forParticipants()
    {
        $events = Event::published()->get();

        return view('pages.for-participants', compact('events'));
    }

    public function forPartners()
    {
        return view('pages.for-partners');
    }

    public function award()
    {
        $awards = Award::all();

        return view('pages.award', compact('awards'));
    }

    public function pressCenter()
    {
        $news = News::published()->latest()->paginate(10);

        return view('pages.press-center', compact('news'));
    }

    public function contacts()
    {
        return view('pages.contacts');
    }

    public function mobileApp()
    {
        return view('pages.mobile-app');
    }

    public function videos()
    {
        return view('pages.videos');
    }
}
