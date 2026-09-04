<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return redirect('/admin/dashboard');
});

Route::prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard/Index');
    });

    Route::get('/karyawan', function () {
        // Dummy data for now since we don't have DB/Models defined in PRD
        $karyawan = [
            ['id' => 1, 'nama' => 'Budi Santoso', 'jabatan' => 'Software Engineer'],
            ['id' => 2, 'nama' => 'Siti Aminah', 'jabatan' => 'HR Manager'],
        ];
        return Inertia::render('Admin/Karyawan/Index', [
            'karyawan' => $karyawan
        ]);
    });

    Route::get('/karyawan/create', function () {
        return Inertia::render('Admin/Karyawan/Create');
    });

    Route::post('/karyawan', function (Request $request) {
        // Handle store logic here
        return redirect('/admin/karyawan');
    });

    Route::get('/karyawan/{id}/edit', function ($id) {
        // Dummy data for edit
        $karyawan = ['id' => $id, 'nama' => 'Budi Santoso', 'jabatan' => 'Software Engineer'];
        return Inertia::render('Admin/Karyawan/Edit', [
            'karyawan' => $karyawan
        ]);
    });

    Route::put('/karyawan/{id}', function (Request $request, $id) {
        // Handle update logic here
        return redirect('/admin/karyawan');
    });
});
