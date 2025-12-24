<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index() {
        return Article::all();
    }

    public function update(Request $request, $id) {
        $article = Article::findOrFail($id);
        $article->update($request->all());
        return $article;
    }

    public function latest() {
        return Article::latest()->first();
    }

    
}
